import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
// @ts-expect-error
import images from "../../assets/images.js";
import "../../assets/images/checkmark-outline.svg";
import {
  EventState,
  EventStateArabic,
  ShipmentState,
  ShipmentTracking,
  TransitEventState,
} from "@/types.js";
import { useTranslation } from "react-i18next";

const ColorlibConnector = styled(StepConnector)(
  // @ts-ignore
  ({ theme, color, vertical }) => ({
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
      display: vertical && document.documentElement.dir === "rtl" && "none",
      width: vertical && 3,
      position: "relative",
      left: vertical && "5%",
      right: document.documentElement.dir === "rtl" && "-116%",
      top: vertical && -2,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  })
);

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
    1: (
      <img
        className="iconStepper"
        src={images.checkIcon}
        style={{ width: "50%" }}
        alt="check_mark"
      />
    ),
    2: (
      <img
        className="iconStepper"
        src={images.briefCase}
        style={{ width: "50%" }}
        alt="check_mark"
      />
    ),
    3: (
      <img
        className="iconStepper"
        src={images.carIcon}
        style={{ width: "50%" }}
        alt="check_mark"
      />
    ),
    4: (
      <img
        className="iconStepper"
        src={images.cartIcon}
        style={{ width: "50%" }}
        alt="check_mark"
      />
    ),
  };

  console.log("color : ", color);
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active, color }}
      className={className}
    >
      {completed ? (
        <img
          className="iconStepper"
          src={images.checkIcon}
          style={{ width: "50%" }}
          alt="check_mark"
        />
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
  currentStatus: ShipmentTracking["CurrentStatus"] | undefined;
}

export default function CustomizedSteppers({
  steps,
  activeStep,
  currentStatus,
}: StepperProps) {
  const [statusColor, setStatusColor] = React.useState("white");
  const [isVertical, setIsVertical] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  const { i18n } = useTranslation();
  React.useEffect(() => {
    if (currentStatus) {
      console.log("currentStatus : ", currentStatus);
      if (currentStatus.state === TransitEventState.DELIVERED) {
        setStatusColor("green");
      } else if (currentStatus.state === TransitEventState.NOT_YET_SHIPPED) {
        setStatusColor("#ffb12b");
      } else {
        setStatusColor("#f4050d");
      }
    } else {
      setStatusColor("white");
    }
  }, [currentStatus]);

  React.useEffect(() => {
    window.addEventListener("resize", (e) => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth < 800) {
        setIsVertical(true);
      } else {
        setIsVertical(false);
      }
    });
  }, []);

  //   React.useEffect(()=>{
  // i1
  //   },[])

  return (
    <Stack sx={{ width: "100%" }} spacing={4} right={""}>
      <Stepper
        alternativeLabel={!isVertical}
        activeStep={activeStep}
        orientation={isVertical ? "vertical" : "horizontal"}
        connector={
          // @ts-ignore

          <ColorlibConnector color={statusColor} vertical={isVertical} />
        }
      >
        {steps.map((label) => (
          <Step key={label.name}>
            <StepLabel
              StepIconComponent={(props) => (
                <ColorlibStepIcon {...props} color={statusColor} />
              )}
            >
              <h4 style={{ fontFamily: "Cairo-Bold" }}>
                {
                  // @ts-ignore

                  i18n.language === "en"
                    ? EventState[label.name]
                    : EventStateArabic[label.name]
                }
              </h4>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
