import { Button } from "reactstrap"
interface LoadingButtonProps {
    color: string;
    loading: boolean;
    buttonText: string;
    type?: any;
    onClick?: any
}
const LoadingButton = ({ color, loading, buttonText, type, onClick }: LoadingButtonProps) => {
    return (
        <Button
            color={color}
            type={type}
            disabled={loading ? true : false}
            onClick={onClick}>
            {loading ? <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i> : ''}
            {buttonText}
        </Button>
    )
}
export default LoadingButton;