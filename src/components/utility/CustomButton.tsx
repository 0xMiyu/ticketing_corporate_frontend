import { Button, useTheme } from "@mui/material";

interface PropType{
    text: String,
    onClick?: (a:any) => any,
    onChange?: (a:any) => any,
    onSubmit?: (a:any) => any
}

const CustomButton = ({text, onClick, onChange, onSubmit}: PropType) => {
    const theme = useTheme();
    return (
        <Button
        size="large"
        variant="contained"
        sx={{ backgroundColor: theme.palette.secondary[200] }}
        onClick={onClick}
        onChange = {onChange}
        onSubmit = {onSubmit}
      >
        {text}
      </Button>
    )
}

export default CustomButton;