export default (code: string) => {
    // Escaping HTML
    let c = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

    // Highlighting
    // Strings
    c = c.replace(/("[^"]*")/g, '<span class="string">$1</span>');
    // Numbers
    c = c.replace(/(\d+)/g, '<span class="number">$1</span>');
    // [ ] ( )
    c = c.replace(/(\{|\}|\[|\]|\(|\))/g, '<span class="bracket">$1</span>');
    // {} (block)
    c = c.replace(/(\{|\})/g, '<span class="block">$1</span>');

    return c;
};
