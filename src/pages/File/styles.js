import styled from 'styled-components';

export const FileInfo = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;
        span {
            font-size: 12px;
            color: #999;
            margin-top: 5px;
            
            button {
                border: 0;
                background: transparent;
                color: #e57878;
                margin-left: 5px;
                cursor: pointer;
            }
        }
    }
`