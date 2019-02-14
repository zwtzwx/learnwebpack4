import './css/index.scss'

function create_div_element () {
  const div_element = document.createElement('div');
  div_element.innerHTML = ['Kobe', 'James'].join(' ');
  return div_element;
}

const div_ele = create_div_element();
document.body.appendChild(div_ele);