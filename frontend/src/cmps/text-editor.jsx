import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactQuill, { Quill, editor } from 'react-quill';
// import ImageResize  from 'quill-image-resize-module';
import 'react-quill/dist/quill.snow.css';
// import katex from "katex";
// import "katex/dist/katex.min.css";
// import CustomToolbar from './CustomToolbar'
// window.katex = katex;

// Quill.register('modules/ImageResize',ImageResize);
export function TextEditor(){

    const [text, setText] = useState('');

    const handleChange = (html) => {
        setText(html);
    }
    const modules = {
        toolbar: {
            container: "#toolbar",
        }
    }
    const formats = [
        'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'header', 'blockquote', 'code-block',
        'indent', 'list',
        'direction', 'align',
        'link', 'image', 'video', 'formula',
    ]

    return <div>
        <CustomToolbar />
        <ReactQuill
            value={text}
            onChange={handleChange}
            modules={modules}
            formats={formats}
        />
        </div>

}


const colors = ["red","green","blue","orange","violet"]
const formats = [
    [
        {
            className:"ql-font",
            options:['serif','monospace']
        },
        {
            className:"ql-size",
            options:["small","large","huge"]
        }
    ],
    [
        {className:"ql-bold"},{className:"ql-italic"},{className:"ql-underline"},{className:"ql-strike"}
    ],
    [
        {
            className:"ql-color",
            options:colors
        },
        {
            className:"ql-background",
            options:colors
        }
    ],
    [
        {
            className:"ql-script",
            value:"sub"
        },
        {
            className:"ql-script",
            value:"super"
        }
    ],
    [
        {
            className:"ql-header",
            value:"1"
        },
        {
            className:"ql-header",
            value:"2"
        },
        {
            className:"ql-blockquote"
        },
        {
            className:"ql-code-block"
        }
    ],
    [
        {
            className:"ql-list",
            value:"ordered"
        },
        {
            className:"ql-list",
            value:"bullet"
        },
        {
            className:"ql-indent",
            value:"-1"
        },
        {
            className:"ql-indent",
            value:"+1"
        }
    ],
    [
        {
            className:'ql-direction',
            value:'rtl'
        },
        {
            className:'ql-align',
            options:['right','center','justify']
        }
    ],
    [
        {className:'ql-link'},{className:'ql-image'},{className:'ql-video'},{className:'ql-formula'}
    ],

]


const renderOptions = (formatData,idx)=>{
    const {className,options} = formatData;
    return (
        <select key={idx} className = {className}>
            <option selected="selected"></option>
            {
                options.map((value,idx) =>{
                    return (
                        <option key={`${idx}+${value}`} value={value}></option>
                    )
                })
            }
        </select>
    )
}
const renderSingle = (formatData,idx)=>{
    const {className,value} = formatData;
    return (
        <button key={idx} className = {className} value = {value}></button>
    )
}
function CustomToolbar(){
    {return <div id="toolbar">
        {
            formats.map((classes,idx) => {
                return <div key={`${idx}+${classes}`} className = "ql-formats">
                        {
                            classes.map((formatData,idx) => {
                                return formatData.options?renderOptions(formatData,idx):renderSingle(formatData,idx)
                            })
                        }
                    </div>
                
            })
        }
    </div>}
  }




