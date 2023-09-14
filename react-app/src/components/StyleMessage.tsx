interface MessageProps {
  color: string;
  message: string;
}

function StyledMessage(props: MessageProps) {
  const contentStyle = {
    color: props.color,
    fontSize: "20px",
  };
  return (
    <>
      <p style={contentStyle}>{props.message}</p>
    </>
  );
}

export default StyledMessage;
