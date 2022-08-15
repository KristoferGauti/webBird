import type { NextPage } from "next";
import FlappyBirdCanvas from "../components/FlappyBirdGame/flappyBirdCanvas";
import Header from "../components/Header/header";

/**
 * TODO:
 * 1) Create a fully functional flappy bird
 * 2) Create a dark mode toggle button in the header component
 * 3) Make the application mobile friendly
 * 4) Use some kind of reinforcement learning algorithm to learn to play Flappy bird optimally
 */

const Home: NextPage = () => {
    return (
        <>
            <Header />
            <FlappyBirdCanvas />
        </>
    );
};

export default Home;
