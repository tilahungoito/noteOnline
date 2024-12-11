// components/ErrorBoundary.js
"use client";
import React from 'react';
import { boolean } from 'zod';

class ErrorBoundary extends React.Component
{
    constructor(props: any)
    {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any)
    {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo)
    {
        console.error("Error caught in ErrorBoundary: ", error);
    }

    // render()
    // {
    //     // if (this.state.hasError)   
    //     // {
    //     //     return <h1>Something went wrong.</h1>;
    //     // }

    //     // return this.props.children;
    // }
}

export default ErrorBoundary;