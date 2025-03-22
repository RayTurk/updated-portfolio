// src/hooks/useDocumentTitle.js
import { useEffect } from 'react';

export default function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Raymond Turk - Web Developer`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}