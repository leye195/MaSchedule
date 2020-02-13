import { keyframes } from "styled-components";
export const fadeIn = keyframes`
    from{
        opacity:0.3;
    }to{
        opacity:1;
    }
`;
export const openModal = keyframes`
    0%{
     opacity:0.0;   
    }
    100%{
        opacity:1.0
    }
`;
export const removeItem = keyframes`
    0%{
        opacity:1.0;
        transform:translateX(0);
    }
    30%{
        opacity:1.0;
        transform:translateX(50px);
    }80%{
        opacity:1.0;
        transform:translateX(-500px);
    }100%{
        opacity:0.0;
        transform:translateX(-500px);
    }
`;
