import searchPhoto from "../assets/search.svg";

const HomePage = () => {
  return (
    <div className="w-screen mt-40 flex justify-center items-center gap-40">
      <div>
        <h1 className="font-bold text-8xl">
          Search <br />
          The Professor.
        </h1>
      </div>
      <div>
        <img src={searchPhoto} alt="image" className="h-120 w-auto" />
      </div>
    </div>
  );
};

export default HomePage;
