import VideoCard from "./VideoCard";

const VideoList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => {
        return <VideoCard key={index} data={item} />;
      })}
    </div>
  );
};
export default VideoList;
