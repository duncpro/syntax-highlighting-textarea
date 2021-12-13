import {ChangeEvent, CSSProperties, useEffect, useRef, useState} from 'react';
import highlight, {HighlightOptions} from 'highlight.js'

/**
 * This component provides an extended version of the HTML textarea element which supports realtime syntax highlighting
 * via highlight.js. This component is theme agnostic, therefore an ancestor component is required to import
 * one of the many themes which is included within highlight.js.
 */
export const SyntaxHighlightingTextarea = (
    props: {
        style?: CSSProperties,
        highlightOptions: HighlightOptions,
    }
) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const textAreaStyle: CSSProperties = {
        // With the exception of the cursor, the textarea element is completely invisible, and instead the
        // contents of the textarea are rendered in the overlayed div. In an unexpected worst-case scenario
        // where the textarea element somehow becomes misaligned with the overlayed div, at least the
        // inputted text will still be readable, even if the cursor is misplaced. Without transparency
        // there is a possibility, albeit small, of duplicated offset text.
        color: 'transparent',
        // All browsers render a white background under the textarea element. In an effort to make this component
        // as flexible as possible, the solid background color is replaced with transparency. Background colors
        // can be imposed on this element by wrapping it within a <div>.
        backgroundColor: 'transparent',
        // In most modern webapps, textareas are not resizable but instead their size instead depends on the dimensions
        // of the viewport and the layout of the application's UI. Therefore, allowing the user to resize the
        // textarea is disabled.
        resize: 'none',

        // Browsers tend to impose a default font family of "monospace" within textarea elements.
        // Remove this default styling such that the font family can be customized by whatever component
        // wraps this one.
        fontFamily: 'inherit',

        // Browsers tend to impose a default font size within textarea elements.
        // Remove this default styling such that the font family can be customized by whatever component wraps this one.
        fontSize: 'inherit',

        // Browsers tend to impose a default padding unto textarea elements.
        // Remove this default styling such that the edge of the textarea is congruent with that of the container element,
        // and therefore that of the overlay div as well.
        padding: 'inherit',

        // Browsers tend to impose a default border unto textarea elements.
        // Remove this default styling so that it can be customized by an ancestor to this component.
        border: 'none',

        // Position the textarea directly on top of the overlay div.
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
    }

    // To maintain a similarity with the default textarea element in HTML, the content value when
    // no input has been entered is an empty string, not undefined.
    const [content, setContent] = useState<string>('');

    const mimicTextareaContents = (event: ChangeEvent<HTMLTextAreaElement>) => setContent(event.target.value);

    useEffect(() => {
        const overlay = overlayRef.current;

        if (!overlay) return;

        // This is used in direct opposition to dangerouslySetHtml. Avoid the security vulnerability where a malicious
        // actor might embed executable javascript within an <script> tag and enter it into the textarea.
        // innerText is much safer alternative.
        overlay.innerHTML = highlight.highlight(content, props.highlightOptions).value;
    }, [props.highlightOptions, overlayRef, content]);

    const overlayStyle: CSSProperties = {
        // Allow the user's mouse actions to passthrough the overlay div and into the underlying textarea.
        pointerEvents: 'none',

        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        height: '100%',
        width: '100%'
    }

    // For the utmost flexibility, as many CSS properties as possible are declared on the topmost
    // container div. Therefore these default styles can be easily overridden by ancestor components
    // which pass in a style prop to this component.
    const defaultContainerStyle: CSSProperties = {
        // Since the textarea's font color is made transparent, the cursor must be explicitly reset to black.
        caretColor: 'black',
        position: 'relative'
    }

    return (
        <div ref={containerRef} style={{ ...defaultContainerStyle, ...props.style }} className={'hljs'}>
            <div ref={overlayRef} style={overlayStyle}/>
            <textarea ref={textareaRef} style={textAreaStyle} onChange={mimicTextareaContents}/>
        </div>
    )
}
