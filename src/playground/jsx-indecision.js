console.log("app js is running");

const app = {
  title: "Test",
  subtitle: "Test 2",
  options: []
};

const resetAll = () => {
  app.options = [];
  render();
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const option = e.target.elements.option.value

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
  console.log(app.options);
};

const appRoot = document.getElementById('app');

const render = () => {
  const template = (
    <div>
      {app.title && <h1>{app.subtitle}</h1>}
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={resetAll}>Reset all</button>
      <ol>
        {
          app.options.map((option) => {
            return <li key={option}>{option}</li>;
          })
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"/>
        <button>Submit</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

render();
