import ReactQuill from "react-quill";

interface Props{
    text: string,
    onChangeText: (text:any) => void,
}

function Editor(props: Props) {
    const { text, onChangeText } = props
    
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3,4,5,6,false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
        ],
    
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image"
    ];
    
    const  handleProcedureContentChange = (content:any) => {
        onChangeText(content)
    };


    return (
        <ReactQuill
        
            modules={modules}
            formats={formats}
            value={text}
            onChange={handleProcedureContentChange}
        >
            <div className="my-editing-area" />
        </ReactQuill>
    );
}

export default Editor;

