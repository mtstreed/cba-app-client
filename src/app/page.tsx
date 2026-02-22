'use client';

import { useState } from "react";
import { createWordDoc, downloadWordDoc, previewWordDoc } from "./utils/msWord";

export default function Home() {
  const [projectDescription, setProjectDescription] = useState("");
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [wordDocBlob, setWordDocBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // const handleRagGenerate = async () => {
  //   try {
  //     setIsGenerating(true);
  //     const response = await fetch('/api/rag-generate', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ projectDescription }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to generate document using RAG');
  //     }

  //     const { content } = await response.json();
  //     setGeneratedContent(content);
  //     const docBlob = await createWordDoc(content);
  //     setWordDocBlob(docBlob);
  //   } catch (error) {
  //     console.error('Error generating document using RAG:', error);
  //     alert('Failed to generate document using RAG. Please try again.');
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate document');
      }

      const { content } = await response.json();
      setGeneratedContent(content);
      const docBlob = await createWordDoc(content);
      setWordDocBlob(docBlob);
    } catch (error) {
      console.error('Error generating document:', error);
      alert('Failed to generate document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = () => {
    if (generatedContent) {
      previewWordDoc(generatedContent);
    } else {
      alert('Please generate a CBA draft first.');
    }
  };

  const handleDownload = () => {
    if (wordDocBlob) {
      downloadWordDoc(wordDocBlob);
    } else {
      alert('Please generate a CBA draft first.');
    }
  };

  const handleReset = () => {
    setProjectDescription("");
    setGeneratedContent(null);
    setWordDocBlob(null);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#e6f3ff] flex flex-col items-center p-8">
      <div className="w-full max-w-2xl flex flex-col items-center gap-6">
        
        <h1 className="text-center text-black text-4xl font-bold mt-8">
          Generate a Community Benefit Agreement (CBA) for your infrastructure project.
        </h1>
        
        <h2 className="text-center text-[#2d3748] text-xl">
          <br/>
          Describe your project.
        </h2>

        {!generatedContent && (
          <div className="w-full bg-white rounded-lg shadow-lg p-8 mt-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 text-[#5dbea3]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                  />
                  <path d="M7 8H17M7 12H17M7 16H13" />
                </svg>
              </div>
              <textarea
                className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#5dbea3] focus:border-transparent text-black placeholder-gray-400"
                placeholder="Example: A 100MW solar farm in rural Arizona. Main community benefit should be $100,000 in a managed fund, and I want airtight land usage rights in return."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                disabled={isGenerating}
              />
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-[#5dbea3] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#2d3748] text-lg">Generating your CBA draft...</p>
          </div>
        )}

        {generatedContent && !isGenerating && (
          <p className="text-[#5dbea3] text-lg font-medium text-center">
            ✓ Your CBA draft has been generated!
          </p>
        )}

        <button
          className="w-full px-8 py-4 bg-emerald-300 text-white rounded-lg hover:bg-emerald-500 transition-colors disabled:opacity-80 disabled:cursor-not-allowed font-medium text-lg"
          onClick={generatedContent ? handleReset : handleGenerate}
          disabled={isGenerating || (!generatedContent && !projectDescription.trim())}
        >
          {isGenerating ? 'Generating...' : (generatedContent ? 'Generate New Draft' : 'Generate CBA Draft')}
        </button>

        {/* <button
          className="w-full px-8 py-4 bg-sky-300 text-white rounded-lg hover:bg-sky-500 transition-colors disabled:opacity-80 disabled:cursor-not-allowed font-medium text-lg"
          onClick={handleRagGenerate}
          disabled={isGenerating || !projectDescription.trim()}
        >
          {isGenerating ? 'Generating...' : 'Generate Draft using RAG'}
        </button> */}

        <div className="flex gap-4 mt-2">
          <button
            className="px-8 py-3 bg-indigo-400 text-white rounded-full hover:bg-indigo-500 transition-colors disabled:opacity-80 disabled:cursor-not-allowed"
            onClick={handlePreview}
            disabled={!generatedContent || isGenerating}
          >
            Preview
          </button>
          <button
            className="px-8 py-3 bg-indigo-400 text-white rounded-full hover:bg-indigo-500 transition-colors disabled:opacity-80 disabled:cursor-not-allowed"
            onClick={handleDownload}
            disabled={!wordDocBlob || isGenerating}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
