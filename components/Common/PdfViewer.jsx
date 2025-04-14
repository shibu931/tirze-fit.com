'use client'
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useState, useEffect } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = ({ filename }) => {
    const [fileUrl, setFileUrl] = useState('');
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // Fix: Dynamically import viewer to ensure client-side only
    const [ViewerComponent, setViewerComponent] = useState(null);

    useEffect(() => {
        // Fix: Encode filename for URL safety
        const encodedFilename = encodeURIComponent(filename);
        setFileUrl(`/assets/lab-report/${encodedFilename}`);
        
        // Dynamically import Viewer to prevent SSR issues
        import("@react-pdf-viewer/core").then((module) => {
            setViewerComponent(() => module.Viewer);
        });
    }, [filename]);

    if (!ViewerComponent) return <div>Loading PDF viewer...</div>;

    return (
        <div className="h-[80vh] w-full">
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
                <Viewer 
                    fileUrl={fileUrl}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        </div>
    );
};

export default PdfViewer;