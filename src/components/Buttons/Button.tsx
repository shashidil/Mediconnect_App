import { Button } from 'antd';

interface buttonProp {
    handleOnClick:() => void;
    text: string;
    color:any;
    backgroundColor: string;
    size : any;
}
export const ColorButton: React.FC<buttonProp> = ({handleOnClick, text,color,backgroundColor,size,}) => {
    return (
        <Button onClick={handleOnClick} style={{ backgroundColor, color }} size={size}>{text}</Button>
    )
}