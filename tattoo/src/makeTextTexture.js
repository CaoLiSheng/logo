import * as THREE from 'three';
import _ from 'lodash';

const getCanvas = (width = 100, height = 200) => {
  const canvas = document.createElement('canvas');
  canvas.width = width || 100;
  canvas.height = height || 200;

  const ctx = canvas.getContext('2d', {
    alpha: true
  });
  ctx.textBaseline = 'middle';
  // ctx.font = `100 90px PingFang SC`;
  // ctx.font = `100 90px HanziPen SC`;
  ctx.font = `100 90px Xingkai SC`;
  ctx.fillStyle = '#fff';
  return {
    canvas,
    ctx
  };
};

const measureText = (lines) => {
  return _.chain(lines).map((line) => {
    const {
      ctx
    } = getCanvas();
    return ctx.measureText(line).width;
  }).max().value();
};

export default (text) => {
  const lines = _.chain(text)
    .split('\n')
    .reduce((newLines, oldLine) => {
      for (let i = 0; i < oldLine.length; i++) {
        if (i >= newLines.length) {
          newLines[i] = [];
        }
        newLines[i].push(oldLine.charAt(i));
      }
      return newLines;
    }, [])
    .map(newChars => ` ${_.chain(newChars).reverse().join('  ').value()} `)
    .value();

  const {
    canvas,
    ctx
  } = getCanvas(
    measureText(lines),
    lines.length * 100
  );

  _.forEach(lines, (line, idx) => {
    ctx.fillText(line, 0, 50 + idx * 100);
  });

  canvas.classList.add('tattoo');
  canvas.style.width = `${100 * canvas.width / canvas.height}px`;
  document.body.appendChild(canvas);

  return {
    texture: new THREE.CanvasTexture(canvas,
      THREE.UVMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping,
      THREE.LinearFilter, THREE.LinearMipMapLinearFilter,
      THREE.RGBAFormat),
    width: canvas.width,
    height: canvas.height,
  };
};