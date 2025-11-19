// src/components/common/MapEmbed.jsx
const MapEmbed = ({ src, height = "400px" }) => {
  return (
    <div className="w-full my-6">
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-md"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
