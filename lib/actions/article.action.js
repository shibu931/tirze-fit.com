"use server";
import { revalidatePath } from 'next/cache';
import connectToDB from '../db/mongoose';
import Article from '@/lib/db/models/article.model';
import {getSimplifiedArticle} from '@/lib/utils'

export async function getAllArticles(lang) {
  try {
    await connectToDB();
    let articles;
    if(lang) articles = await Article.find({ lang }, 'title metaDescription slug type ogImage').lean();
    else articles = await Article.find({},'title metaDescription slug type ogImage').lean();
    return { success: true, articles: JSON.parse(JSON.stringify(articles)) };
  } catch (error) {
    console.error('Error fetching all articles:', error.message);
    return { success: false, error: error.message };
  }
}

export async function getArticle(lang, slug) {
  try {
    await connectToDB();
    const article = await Article.findOne({ slug, lang });
    if (!article) {
      return { success: false, error: 'Article not found' };
    }
    console.log(article);
    
    const simplifiedArticle = getSimplifiedArticle(article);
    return { success: true, article: simplifiedArticle };
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error.message);
    return { success: false, error: error.message };
  }
}

export async function deleteArticle(lang, slug) {
  try {
    await connectToDB();
    const deletedArticle = await Article.findOneAndDelete({lang, slug });
    if (!deletedArticle) {
      return { success: false, error: 'Article not found' };
    }
    revalidatePath('/articles')
    return { success: true, message: 'Article deleted successfully' };
  } catch (error) {
    console.error(`Error deleting article with slug ${slug}:`, error.message);
    return { success: false, error: error.message };
  }
}

export async function getByArticlesType(lang,type) {
  try {
    await connectToDB();
    let articles;
    if(!lang) articles = await Article.find({ type });
    else if(lang && type) articles = await Article.find({ lang ,type });
    else if(!type) articles = await Article.find({ lang });
    return { success: true, articles };
  } catch (error) {
    console.error(`Error fetching articles of type ${type}:`, error.message);
    return { success: false, error: error.message };
  }
}