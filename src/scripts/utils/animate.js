export const animate = ({timing, draw, duration}, callback) => {
    const start = performance.now();
  
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) {
            timeFraction = 1;
        }

        const progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        } else {
            callback();
        }
    });
  }