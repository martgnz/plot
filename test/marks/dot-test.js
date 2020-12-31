import * as Plot from "@observablehq/plot";
import tape from "tape-await";

tape("Dot() has the expected defaults", test => {
  const dot = new Plot.Dot();
  test.strictEqual(dot.data, undefined);
  test.strictEqual(dot.transform("foo"), "foo");
  test.deepEqual(dot.channels.map(c => c.name), ["x", "y"]);
  test.deepEqual(dot.channels.map(c => c.value([1, 2])), [1, 2]);
  test.deepEqual(dot.channels.map(c => c.scale), ["x", "y"]);
  test.strictEqual(dot.r, 3);
  test.strictEqual(dot.fill, "none");
  test.strictEqual(dot.fillOpacity, undefined);
  test.strictEqual(dot.stroke, "currentColor");
  test.strictEqual(dot.strokeWidth, 1.5);
  test.strictEqual(dot.strokeOpacity, undefined);
  test.strictEqual(dot.strokeLinejoin, undefined);
  test.strictEqual(dot.strokeLinecap, undefined);
  test.strictEqual(dot.strokeMiterlimit, undefined);
  test.strictEqual(dot.strokeDasharray, undefined);
  test.strictEqual(dot.mixBlendMode, undefined);
});

tape("Dot(data, {z}) specifies an optional z channel", test => {
  const dot = new Plot.dot([{x: 1}, {x: 2}, {x: 3}], {z: "x"});
  const z = dot.channels.find(c => c.name === "z");
  test.strictEqual(z.value, "x");
  test.strictEqual(z.scale, undefined);
});

tape("Dot(data, {r}) allows r to be a constant radius", test => {
  const dot = new Plot.dot([{x: 1}, {x: 2}, {x: 3}], {r: 42});
  test.strictEqual(dot.r, 42);
});

tape("Dot(data, {r}) allows r to be a variable radius", test => {
  const dot = new Plot.dot([{x: 1}, {x: 2}, {x: 3}], {r: "x"});
  test.strictEqual(dot.r, undefined);
  const r = dot.channels.find(c => c.name === "r");
  test.strictEqual(r.value, "x");
  test.strictEqual(r.scale, "r");
});

tape("Dot(data, {title}) specifies an optional title channel", test => {
  const dot = new Plot.dot([{x: 1}, {x: 2}, {x: 3}], {title: "x"});
  const title = dot.channels.find(c => c.name === "title");
  test.strictEqual(title.value, "x");
  test.strictEqual(title.scale, undefined);
});

tape("Dot(data, {fill}) allows fill to be a constant color", test => {
  const dot = new Plot.dot([{x: 1}, {x: 2}, {x: 3}], {fill: "red"});
  test.strictEqual(dot.fill, "red");
});

tape("Dot(data, {fill}) allows fill to be a variable color", test => {
  const dot = new Plot.dot([{x: 1}, {x: 2}, {x: 3}], {fill: "x"});
  test.strictEqual(dot.fill, undefined);
  const fill = dot.channels.find(c => c.name === "fill");
  test.strictEqual(fill.value, "x");
  test.strictEqual(fill.scale, "color");
});

tape("Dot(data, {fill}) defaults stroke to undefined if fill is not none", test => {
  test.strictEqual(new Plot.dot(undefined, {fill: "red"}).stroke, undefined);
  test.strictEqual(new Plot.dot(undefined, {fill: "x"}).stroke, undefined);
  test.strictEqual(new Plot.dot(undefined, {fill: "none"}).stroke, "currentColor");
});

tape("Dot(data, {stroke}) allows stroke to be a constant color", test => {
  const dot = new Plot.dot([{x: 1}, {x: 2}, {x: 3}], {stroke: "red"});
  test.strictEqual(dot.stroke, "red");
});

tape("Dot(data, {stroke}) allows stroke to be a variable color", test => {
  const dot = new Plot.dot([{x: 1}, {x: 2}, {x: 3}], {stroke: "x"});
  test.strictEqual(dot.stroke, undefined);
  const stroke = dot.channels.find(c => c.name === "stroke");
  test.strictEqual(stroke.value, "x");
  test.strictEqual(stroke.scale, "color");
});

tape("Dot(data, {stroke}) defaults strokeWidth to 1.5 if stroke is defined", test => {
  test.strictEqual(new Plot.dot(undefined, {stroke: "red"}).strokeWidth, 1.5);
  test.strictEqual(new Plot.dot(undefined, {stroke: "x"}).strokeWidth, 1.5);
  test.strictEqual(new Plot.dot(undefined, {stroke: null}).strokeWidth, undefined);
});