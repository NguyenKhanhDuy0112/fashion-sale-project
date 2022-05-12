import { ReactChild, ReactComponentElement, ReactNode } from "react";

interface Pane{
    title: string
    children: ReactNode | ReactChild | ReactComponentElement<any>
}

function PaneCustom(props: Pane) {
    const { children } = props
    return ( 
        <div>{children}</div>
     );
}

export default PaneCustom;