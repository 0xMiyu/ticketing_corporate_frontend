import { Button, Box, useTheme, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { Stadium, AccessTimeFilled, ConfirmationNumber, PieChart} from "@mui/icons-material";



const FormStepIndicator = () => {

  const theme = useTheme();

  return (

      <Box
      sx = {{
        margin: "0 100 0 100",

        width: "40%",
        height: "80vh",
      }}>

        <Box sx = {{
          display: "flex",
          height: "10vh",
          alignItems: "center",
          justifyContent: "end",
        }}>


          <FlexBetween sx = {{width: "20%", justifyContent: "end", position: "relative"}}>
            <Typography sx = {{position:"relative", marginRight:"5px"}}>
                Event Title
            </Typography>
            
            <Stadium/>

            <Box sx = {{height: "20px", width : "20px", borderRadius: "50%", backgroundColor: theme.palette.secondary[200],zIndex:"2"}}/>
            {/* This is the black line cutting the circles */}
            <Box sx = {{
            width: "3px",
            height: "5vh",
            backgroundColor: theme.palette.background.paper,
            position:"absolute",
            right:"7px",
            zIndex: "1",
            height: "400px",
            top:"-20px"
          }}
            />
          </FlexBetween>
        </Box>

        <Box sx = {{
          display: "flex",
          height: "10vh",
          alignItems: "center",
          justifyContent: "end",
        }}>
          <FlexBetween sx = {{width: "30%", justifyContent:"end"}}>
            <Typography sx = {{position:"relative", marginRight:"5px"}}>
              Time and Location
            </Typography>
            <AccessTimeFilled/>
            <Box sx = {{height: "20px", width : "20px", borderRadius: "50%", backgroundColor: theme.palette.secondary[200],zIndex:"2"}}/>
          </FlexBetween>
        </Box>

        <Box sx = {{
          display: "flex",
          height: "10vh",
          alignItems: "center",
          justifyContent: "end",
        }}>
          <FlexBetween sx = {{width: "30%", justifyContent:"end"}}>
            <Typography sx = {{marginRight:"5px"}}>
              Pricing and categories
            </Typography>
            <ConfirmationNumber/>
            <Box sx = {{height: "20px", width : "20px", borderRadius: "50%", backgroundColor: theme.palette.secondary[200],zIndex:"2"}}/>
          </FlexBetween>
        </Box>

        <Box sx = {{
          display: "flex",
          height: "10vh",
          alignItems: "center",
          justifyContent: "end",
        }}>
          <FlexBetween sx = {{width: "30%", justifyContent:"end"}}>
        <Typography sx = {{marginRight:"5px"}}>
              Define Royalties
            </Typography>
            <PieChart/>
            <Box sx = {{height: "20px", width : "20px", borderRadius: "50%", backgroundColor: theme.palette.secondary[200],zIndex:"2"}}/>
          </FlexBetween>
        </Box>
      </Box>

  )
}

export default FormStepIndicator