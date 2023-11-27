import "./Profiles.css";

interface ProfilesProps {
  DataBoard: any;
}

export default function profiles({ DataBoard }: ProfilesProps) {
  return <div id="profile">{item(DataBoard)}</div>;
}

function item(data: any) {
  return (
    <>
      {data.map((value: any, index: any) => (
        <div className="flex" key={index}>
          <div className="item">
            <span className="rank">{index + 1}</span>
            <img src={value.img} alt="" />
            <div className="info">
              <h3 className="name">{value.name}</h3>
              <span>{value.location}</span>
            </div>
          </div>
          <div className="score">
            <span>{value.score} XP</span>
          </div>
        </div>
      ))}
    </>
  );
}
