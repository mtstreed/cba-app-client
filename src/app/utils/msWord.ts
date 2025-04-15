import { Document, Packer, Paragraph, TextRun } from 'docx';
import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function createWordDoc(content: string): Promise<Blob> {
    // Split content into paragraphs
    const paragraphs = content.split('\n').filter(line => line.trim() !== '');

    const doc = new Document({
        sections: [{
            properties: {},
            children: paragraphs.map(para => 
                new Paragraph({
                    children: [
                        new TextRun({
                            text: para,
                            size: 24, // 12pt font
                        })
                    ],
                    spacing: {
                        after: 200, // Add space after each paragraph
                        line: 360, // 1.5 line spacing
                    }
                })
            ),
        }],
    });

    return await Packer.toBlob(doc);
}

export function downloadWordDoc(blob: Blob, filename: string = 'cba-draft.docx') {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}

export async function previewWordDoc(content: string) {
    try {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        let currentPage = pdfDoc.addPage([800, 1000]); // Larger page size
        const { width, height } = currentPage.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Add the content to the PDF with proper formatting
        const fontSize = 12;
        const margin = 50;
        const maxWidth = width - (margin * 2);
        let yPosition = height - margin;

        // Split content into paragraphs
        const paragraphs = content.split('\n').filter(line => line.trim() !== '');

        for (const paragraph of paragraphs) {
            // Word wrap implementation
            const words = paragraph.split(' ');
            let currentLine = '';
            
            for (const word of words) {
                const testLine = currentLine ? `${currentLine} ${word}` : word;
                const testWidth = font.widthOfTextAtSize(testLine, fontSize);
                
                if (testWidth > maxWidth) {
                    // Draw current line and start new line
                    currentPage.drawText(currentLine, {
                        x: margin,
                        y: yPosition,
                        size: fontSize,
                        font,
                    });
                    yPosition -= fontSize * 1.5;
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            }
            
            // Draw the last line of the paragraph
            if (currentLine) {
                currentPage.drawText(currentLine, {
                    x: margin,
                    y: yPosition,
                    size: fontSize,
                    font,
                });
                yPosition -= fontSize * 2.5; // Extra space after paragraph
            }

            // Add a new page if we're running out of space
            if (yPosition < margin) {
                currentPage = pdfDoc.addPage([800, 1000]);
                yPosition = height - margin;
            }
        }

        // Save the PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        // Open in a popup window with more width
        const popupWidth = 850; // Increased width
        const popupHeight = 800; // Increased height
        const left = (window.screen.width - popupWidth) / 2;
        const top = (window.screen.height - popupHeight) / 2;
        
        const popup = window.open(
            url,
            'Preview',
            `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes`
        );

        // Clean up the URL after the window loads
        if (popup) {
            popup.onload = () => {
                setTimeout(() => URL.revokeObjectURL(url), 1000);
            };
        }
    } catch (error) {
        console.error('Error creating preview:', error);
        alert('Failed to create preview. Please try downloading instead.');
    }
}
