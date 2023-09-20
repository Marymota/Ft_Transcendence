interface MessageProps {
  color: string;
  children: React.ReactNode;
}

function StyledMessage(props: MessageProps) {
  console.log('child');
  const contentStyle = {
    color: props.color,
    fontSize: '20px',
  };

  return (
    <>
      <p style={contentStyle}>{props.children}</p>
    </>
  );
}

export default StyledMessage;
