document.getElementById('add-option-button').addEventListener('click', function() {
    const optionsContainer = document.getElementById('options-container');
    const optionCount = optionsContainer.children.length / 2 + 1;
    
    const newLabel = document.createElement('label');
    newLabel.setAttribute('for', 'option' + optionCount);
    newLabel.textContent = 'Option ' + optionCount + ':';
    
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', 'option' + optionCount);
    newInput.setAttribute('name', 'options[]');
    newInput.setAttribute('required', 'required');
    
    optionsContainer.appendChild(newLabel);
    optionsContainer.appendChild(newInput);
});