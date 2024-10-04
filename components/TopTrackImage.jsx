import html2canvas from 'html2canvas';

const TopTrackImage = ({ track }) => {
  const downloadImage = () => {
    const element = document.getElementById("top-track");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "top-track.png";
      link.click();
    });
  };

  return (
    <div>
      <div id="top-track" className="bg-gray-800 p-4 rounded-lg">
        <img src={track.album.images[0].url} alt={track.name} className="w-full rounded-lg" />
        <h3 className="text-lg font-semibold mt-2">{track.name}</h3>
        <p className="text-gray-400">{track.artists[0].name}</p>
      </div>
      <button onClick={downloadImage} className="mt-4 bg-green-500 px-4 py-2 rounded-lg">
        Download Image
      </button>
    </div>
  );
};

export default TopTrackImage;
