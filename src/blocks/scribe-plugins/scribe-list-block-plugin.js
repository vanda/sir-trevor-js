"use strict";

var selectionRange = require('selection-range');

var ScribeListBlockPlugin = function(block) {
  return function(scribe) {
    scribe.el.addEventListener('keydown', function(ev) {

      if (block.supressKeyListeners) {
        return;
      }

      var rangeToHTML = function(range) {
        var div = document.createElement('div');
        div.appendChild(range.extractContents());

        return div.innerHTML;
      };

      var selectToEnd = function() {
        var selection = new scribe.api.Selection();
        var range = selection.range.cloneRange();
        range.setEndAfter(scribe.el.lastChild, 0);

        return range;
      };

      var currentPosition = function() {
        var selection = new scribe.api.Selection();
        return selection.range.startOffset;
      };

      var isCaretAtStartOfBlock = function() {
        var currentRange = selectionRange(scribe.el);
        return currentRange.start === 0 && (currentRange.start === currentRange.end);
      };

      var content;

      if (ev.keyCode === 13 && !ev.shiftKey) { // enter pressed
        ev.preventDefault();

        if (scribe.getTextContent().length === 0 && !block.nextListItem()) {
          block.removeCurrentListItem();
          block.mediator.trigger("block:create", 'Text', null, block.el, { autoFocus: true });
        } else {
          content = rangeToHTML(selectToEnd());
          block.addListItemAfterCurrent(content);

        }

      } else if (ev.keyCode === 8 && isCaretAtStartOfBlock()) {
        ev.preventDefault();

        if (block.isLastListItem()) {
          block.mediator.trigger('block:remove', block.blockID);
        } else if (!block.previousListItem()) {
          // TODO:
        } else {
          content = scribe.getContent();
          block.removeCurrentListItem();
          block.appendToCurrentItem(content);
        }
      } else if (ev.keyCode === 46) {
        // TODO: Pressing del from end of list item
      }
    });
  };
};

module.exports = ScribeListBlockPlugin;
