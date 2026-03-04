const createElement = (tag, props = {}, styles = {}) => {
const el = document.createElement(tag);
Object.assign(el, props);
Object.assign(el.style, styles);
return el;
};

const formInput = (conTarget) => {
const container = createElement(
"section",
{},
{
position: "absolute",
right: "0",
display: "flex",
alignItems: "center",
gap: "0.5rem",
},
);

const containerP = createElement(
"p",
{ textContent: "Add task" },
{
backgroundColor: "var(--primary)",
padding: "0.3rem 1rem",
borderRadius: "5px",
fontWeight: "900",
fontSize: "0.9em",
color: "var(--card)",
},
);

const button = createElement(
"button",
{ type: "button" },
{
display: "inline-flex",
justifyContent: "center",
alignItems: "center",
height: "2rem",
aspectRatio: "1/1",
backgroundColor: "var(--primary)",
color: "var(--card)",
cursor: "pointer",
borderRadius: "50%",
},
);

const containerForm = createElement(
"section",
{},
{
display: "none",
position: "fixed",
height: "100svh",
width: "100%",
backgroundColor: "#2a2a2a8d",
backdropFilter: "blur(5px)",
inset: "0",
zIndex: "101",
justifyContent: "center",
},
);

const formSection = createElement(
"section",
{},
{
height: "100svh",
position: "relative",
width: "90%",
maxWidth: "70rem",
// backgroundColor: "red",
},
);

const buttonSpan = createElement("span", {
className: "material-symbols-outlined",
textContent: "add",
});

const formClose = createElement(
"button",
{
textContent: "Close",
},
{
position: "absolute",
right: "0",
top: "0",
margin: "2% 1%",
backgroundColor: "var(--bg)",
padding: "0.8rem 1rem",
fontWeight: "700",
fontSize: "0.9em",
color: "var(--primary)",
borderRadius: "5px",
},
);

button.addEventListener("click", () => {
containerForm.style.display = "flex";
});

formClose.addEventListener("click", () => {
containerForm.style.display = "none";
});

document.body.appendChild(containerForm);
containerForm.appendChild(formSection);
formSection.appendChild(formClose);
button.appendChild(buttonSpan);
container.append(containerP, button);
conTarget.appendChild(container);
};

export default formInput;
