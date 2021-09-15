const search = document.querySelector('#search');
const newItem = document.getElementById('new');
const add = document.querySelector('form');
const list = document.querySelector('ul');
const display_msg = document.querySelector('.undo_message');  
const undoBtn = document.querySelector('#undo');
const undoMessage = document.querySelector('.undo_message');


// ADD ITEM
add.addEventListener('submit', (e) => {
    e.preventDefault();
    let li = document.createElement('li');
    li.className = 'item';
    li.appendChild(document.createTextNode(newItem.value));
    let newbtn = document.createElement('button');
    newbtn.className = 'btn';
    let newspan = document.createElement('span');
    newbtn.appendChild(document.createTextNode('X'));
    newspan.appendChild(newbtn);
    li.appendChild(newspan);
    console.log('added element', li);
    list.insertBefore(li,document.querySelector('li')); //to insert on top of list
    newItem.value = '';
});

// REMOVE ITEM
list.addEventListener('click', (e) => {
    clearTimeout();
    if (e.target.classList.contains('btn'))
    {
        let parentLi = (e.target.parentElement).parentElement;
        $(parentLi).slideUp(100);
        display_msg.style.display = 'flex';
        let t = setTimeout(() => {
            display_msg.style.display = 'none';
            parentLi.remove();
        },2000);
        // undo
        undoMessage.firstElementChild.innerText = `${parentLi.innerText.split('\n')[0]} deleted`;
        undoBtn.addEventListener('click', () => {
            display_msg.style.display = 'none';
            clearTimeout(t);
            $(parentLi).slideDown(100);
            undoMessage.firstElementChild.innerText = '';
        });
    }
});

// SEATCH ITEM
search.addEventListener('keyup', (e) => {
    // console.log(Array.from(list.querySelectorAll('li')))
    let items = document.querySelectorAll('li');
    let flag = 0;
    items.forEach(item => {
        if (item.innerText.toLowerCase().includes(search.value.toLowerCase()) != 1)
        {
            item.style.display = 'none';
            flag = 1;
        }
        else
            item.style.display = 'flex';
    });
});

// STRIKE THROUGH
list.addEventListener('click', (e) => {
    if (e.target.tagName == 'LI')
        e.target.classList.toggle('checked');
});