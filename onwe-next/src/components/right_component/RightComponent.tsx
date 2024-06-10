import Events from "./Events";
import Hots from "./Hots";
import Magazines from "./Magazines";

const RightComponent = () => {
  return (
    <div className="w-[350px]">
      <Magazines />
      <Hots />
      <Events />
    </div>
  );
};

export default RightComponent;
