import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
// @ts-expect-error
import images from "../../assets/images.js";
import "../../assets/images/checkmark-outline.svg";
import { ShipmentTracking, TransitEventState } from "@/types.js";

const ColorlibConnector = styled(StepConnector)(({ theme, color }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: color,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: color,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean; color?: string };
}>(({ theme, ownerState }) => ({
  backgroundColor: "white",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  transform: "scale(1.2)",
  border: "1px solid #ccc",
  ...(ownerState.active && {
    background: ownerState.color,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: "url(../../assets/images/checkmark-outline.svg)",
    backgroundColor: ownerState.color,
    transform: "scale(0.7)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className, color } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <img src={images.checkIcon} style={{ width: "50%" }} alt="check_mark" />,
    2: <img src={images.checkIcon} style={{ width: "50%" }} alt="check_mark" />,
    3: <img src={images.carIcon} style={{ width: "50%" }} alt="check_mark" />,
    4: <img src={images.cartIcon} style={{ width: "50%" }} alt="check_mark" />,
  };

  console.log("color : ", color);
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active, color }}
      className={className}
    >
      {completed ? (
        <img src={images.checkIcon} style={{ width: "50%" }} alt="check_mark" />
      ) : (
        icons[String(props.icon)]
      )}
    </ColorlibStepIconRoot>
  );
}
interface StepperProps {
  steps: {
    name: TransitEventState;
  }[];
  activeStep: number;
  currentStatus: Pick<ShipmentTracking, "CurrentStatus"> | undefined;
}

enum ShipmentState {
  TICKET_CREATED = "Order has been created",
  PACKAGE_RECEIVED = "Package received",
  OUT_FOR_DELIVERY = "Out for delivery",
  DELIVERED = "Delivered",
}
export default function CustomizedSteppers({
  steps,
  activeStep,
}: StepperProps) {
  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector color="green" />}
      >
        {steps.map((label) => (
          <Step key={label.name}>
            <StepLabel
              StepIconComponent={(props) => (
                <ColorlibStepIcon {...props} color={"green"} />
              )}
            >
              {ShipmentState[label.name]}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
