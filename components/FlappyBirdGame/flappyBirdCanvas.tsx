import React, { useEffect, useRef } from "react";
import styles from "./canvas.module.css";

const FlappyBirdCanvas = (props: any): React.ReactElement => {
    const canvasRef = useRef(null);
    let birdPosX = 50;
    let birdPosY = 340;

    const draw = (ctx: CanvasRenderingContext2D) => {
        // Draw the background
        ctx.canvas.width = window.innerWidth * 0.9;
        ctx.canvas.height = window.innerHeight - 200;
        ctx.fillStyle = "#A3E8FD";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw the bird
        const bird_img = new Image();
        bird_img.src = "/flappy_bird.png";
        console.log(bird_img);

        bird_img.onload = () => {
            ctx.drawImage(bird_img, birdPosX, birdPosY, 50, 50);
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement | null;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                birdPosY = ctx.canvas.height / 2;
                draw(ctx);
            }
        } else {
            throw Error("Canvas element Error!");
        }
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <canvas className={styles.canvas} ref={canvasRef} {...props} />
        </div>
    );
};

export default FlappyBirdCanvas;
