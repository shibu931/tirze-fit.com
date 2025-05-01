'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { verifyEmail } from '@/lib/actions/user.action'
// import { verifyEmail } from '@/lib/actions/auth.actions' // Assuming this is your API function

const VerifyEmail = ({locale}) => {
    const params = useSearchParams()
    const email = params.get('email')
    const router = useRouter()
    const [otp, setOtp] = useState()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [countdown, setCountdown] = useState(30)

    async function handleSendOtp() {
        if (!email) {
            setError('Email address is required')
            return
        }

        setLoading(true)
        setError('')
        setSuccess('')
        try {
            console.log("Locale log in VerifyEmail file ", locale)
            const result = await verifyEmail(email, 'send-otp', null, locale)
            if (result.success) {
                setSuccess('New OTP sent to your email')
                setCountdown(30)
            } else {
                setError(result.message || 'Failed to send OTP')
            }
        } catch (err) {
            setError('An error occurred while sending OTP')
        } finally {
            setLoading(false)
        }
    }

    async function handleVerifyOtp(e) {
        e.preventDefault()
        if (!email || !otp) {
            setError('Email and OTP are required')
            return
        }

        setIsVerifying(true)
        setError('')
        setSuccess('')
        try {
            const result = await verifyEmail(email, 'verify-otp', otp)
            if (result.success) {
                setSuccess('Email verified successfully! Redirecting...')
                // Redirect to login or dashboard after 2 seconds
                router.push('/auth?tab=login')
            } else {
                setError(result.message || 'Invalid OTP')
            }
        } catch (err) {
            setError('An error occurred while verifying OTP. ',err.message)
        } finally {
            setIsVerifying(false)
        }
    }

    useEffect(() => {
        if (email) {
            handleSendOtp()
        }
    }, [email])

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [countdown])

    if (!email) {
        return (
            <div className="mx-auto max-w-md bg-slate-50 p-6 rounded text-center">
                <h2 className="text-2xl font-bold mb-3 text-red-500">
                    Invalid verification request
                </h2>
                <p>Missing email parameter. Please check your verification link.</p>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-3 text-center">Verify Your Email</h2>
            <p className="text-center mb-6">
                We've sent a 6-digit OTP to <span className="font-semibold">{email}</span>
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-4 flex flex-col justify-center items-center">
                <div className="grid gap-2">
                    <Label htmlFor="otp mb-2">
                        Enter One Time Password (OTP)
                    </Label>
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    {error.invitationCode && (
                        <p className="text-red-500 text-sm">{error.invitationCode}</p>
                    )}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <Button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800"
                    disabled={isVerifying || loading}
                >
                    {isVerifying ? "Verifying..." : "Verify"}
                </Button>

                <div className="text-center text-sm">
                    <p className="mb-2">
                        Didn't receive the code?{' '}
                        <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={countdown > 0 || loading}
                            className="text-blue-600 hover:underline disabled:text-gray-400"
                        >
                            Resend OTP {countdown > 0 && `(${countdown})`}
                        </button>
                    </p>
                    <p>
                        Wrong email?{' '}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Update email address
                        </a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default VerifyEmail

