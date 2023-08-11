import { Link } from "react-router-dom";

const Home = () => {
  return <div>Hello world! <Link to={'/redirect'}>Teste</Link></div>;
};

export default Home;