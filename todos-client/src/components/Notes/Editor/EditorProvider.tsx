import "@wellspr/react-quill-editor/style.css";
import { Config } from "@wellspr/react-quill-editor";
import dynamic from "next/dynamic";

// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
const Provider = dynamic(() =>
    import("@wellspr/react-quill-editor").then(m => m.Provider),
    { ssr: false }
);

const EditorProvider = (props: {
    readOnly?: boolean;
    children: React.ReactNode
}) => {

    const config: Config = {
        options: {
            theme: "snow",
            modules: {
                toolbar: "#toolbar",
            },
            readOnly: props.readOnly || false,
        },
    };

    return (
        <Provider config={config}>
            {props.children}
        </Provider>
    );
};

export default EditorProvider;