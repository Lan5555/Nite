
export const nJToast = (function() {
  const toast = document.createElement('div');
  const header = document.createElement('h1');
  const text = document.createElement('p');
  const progressBar = document.createElement('div');

  // Append elements to the toast
  toast.appendChild(header);
  toast.appendChild(text);
  toast.appendChild(progressBar);
  

  // Set initial styles for progressBar
  progressBar.style.height = '5px'; // Set a height for the progress bar
  progressBar.style.width = '100%'; // Start full width
  progressBar.style.backgroundColor = 'white'; // Progress bar color

  // Return object with methods
  return {
    success: function(options = {}) {
      const defaultOptions = {
        title: 'Success',
        message: 'Toast shown successfully',
        timeout: 4000,
        position: 'topRight',
        color: 'white',
        backgroundColor: 'green',
        titleColor: 'white',
        textColor: 'black',
        progressBarColor: 'white'
      };

      const config = { ...defaultOptions, ...options };
      this.showToast(config);
    },

    warning: function(options = {}) {
      const defaultOptions = {
        title: 'Warning',
        message: 'Warning toast shown',
        timeout: 4000,
        position: 'topRight',
        color: 'white',
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        titleColor: 'white',
        textColor: 'black',
        progressBarColor: 'white'
        
      };

      const config = { ...defaultOptions, ...options };
      this.showToast(config);
    },

    showToast: function(config) {
      document.body.appendChild(toast);
      toast.classList.add('toast');
      header.classList.add('header');
      text.classList.add('text');
      toast.style.display = "block";
      toast.style.position = 'absolute';
      progressBar.classList.add('progressBar');

      // Clear previous content
      header.innerHTML = '';
      text.innerHTML = '';

      // Positioning logic
      toast.style.top = config.position.includes('top') ? '10px' : 'auto';
      toast.style.bottom = config.position.includes('bottom') ? '10px' : 'auto';
      toast.style.left = config.position.includes('Left') ? '10px' : 'auto';
      toast.style.right = config.position.includes('Right') ? '10px' : 'auto';

      // Set colors and content
      header.innerHTML = config.title;
      text.innerHTML = config.message;
      header.style.color = config.titleColor;
      text.style.color = config.textColor;
      toast.style.backgroundColor = config.backgroundColor;
      progressBar.style.backgroundColor = config.progressBarColor;
      // Initialize the progress bar
      progressBar.style.width = '100%';

      // Animate the progress bar
      let width = 100; // Starting width
      const interval = setInterval(() => {
        width -= 100 / (config.timeout / 100); // Decrease width based on timeout
        progressBar.style.width = `${width}%`;

        if (width <= 0) {
          clearInterval(interval);
          toast.style.display = "none"; // Hide toast when done
        }
      }, 100); // Update every 100 milliseconds
    }
  };
})();

export const nJFloatingActionButton = (function() {
  return {
    FloatingActionButton: function(child = {},target) {
      const defaultButton = {
        text: '<strong style="font-size: 22pt;">+</strong>',
        position: 'bottomRight',
        backgroundColor: 'plum',
        color: 'white',
        onclick: () => {},
      };
      const config = { ...defaultButton, ...child };
      this.renderButton(config,target);
    },

    renderButton: function(config,target) {
      const button = document.createElement('button'); // Create a new button instance
      button.classList.add('floating');
      button.innerHTML = config.text;
      button.style.position = 'fixed';
      button.style.top = config.position.includes('top') ? '30px' : 'auto';
      button.style.bottom = config.position.includes('bottom') ? '80px' : 'auto';
      button.style.left = config.position.includes('Left') ? '30px' : 'auto';
      button.style.right = config.position.includes('Right') ? '30px' : 'auto';
      button.style.color = config.color;
      button.style.backgroundColor = config.backgroundColor;

      button.addEventListener('click', () => {
        if (typeof config.onclick === 'function') {
          config.onclick();
        }
        button.style.backgroundColor = 'grey'; // Click feedback
        setTimeout(() => {
          button.style.backgroundColor = config.backgroundColor;
        }, 200);
      });

      target.appendChild(button);
    }
  };
})();

export const nJListTile = (function(){
  
  
  return {
    ListTile: function(params = {}) {
      const defaultList = {
        title:'Content',
        leading:'Icon',
        trailing:'>',
        iconColor:'black',
        actionColor: 'black',
        titleColor:'black',
        onTrailingClick: () => {}
      };
      const config = {...defaultList, ...params};
      this.showTile(config);
    },
    showTile: function(config) {
      const listTile = document.createElement('div');
      const leading = document.createElement('p');
      const trailing = document.createElement('p');
      const title = document.createElement('p');
      listTile.appendChild(leading);
      listTile.appendChild(title);
      listTile.appendChild(trailing);
      document.body.appendChild(listTile);
      leading.innerHTML = config.leading
      ;
      title.innerHTML = config.title;
      trailing.innerHTML = config.trailing;
      leading.style.color = config.iconColor;
      trailing.style.color = config.actionColor;
      title.style.color = config.titleColor;
     
      leading.classList.add('leading');
      trailing.classList.add('trailing');
      title.classList.add('title');
      listTile.classList.add('listtile');
      trailing.addEventListener('click', () => {
        config.onTrailingClick();
      });
    }
   
  };
  
})();

export const nJContainer = (function() {
  return {
    Container: function(params = {}) {
      const defaultStyle = {
        width: '100%',
        height: '200px',
        borderRadius: '0',
        border: 'none',
        padding: '5px',
        margin: '0',
        backgroundColor: 'white',
        item1: null,
        item2:null,
        item3:null,
        item4:null
        // Default to null, since we expect an element, not a string
      };

      const config = { ...defaultStyle, ...params };
      this.displayContainer(config);
    },

    displayContainer: function(config) {
      const div = document.createElement('div'); // Create a new div each time
      div.classList.add('con');
      div.style.width = config.width;
      div.style.height = config.height;
      div.style.border = config.border;
      div.style.padding = config.padding;
      div.style.margin = config.margin;
      div.style.borderRadius = config.borderRadius;
      div.style.backgroundColor = config.backgroundColor;
      if(config.append instanceof HTMLElement){
        div.appendChild(config.item1);
        div.appendChild(config.item2);
        div.appendChild(config.item3);
        div.appendChild(config.item4);
      }
      document.body.appendChild(div);
    }
  };
})();

export const nJBottomSheet = (function() {
  return {
    Sheet: function(params = {}) {
      const defaultParams = {
        width: '100%',
        height: '50vh',
        type: 'message', // 'message' or 'list'
        message: "Add text here",
        list: [],
        link:[]
      };
      const config = { ...defaultParams, ...params };
      this.showSheet(config);
    },

    showSheet: function(config) {
      // Remove existing bottom sheet if any
      const existingSheet = document.querySelector('.nJ-bottom-sheet');
      if (existingSheet) existingSheet.remove();

      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'nJ-overlay fixed inset-0 bg-black opacity-half z-40';

      // Create sheet container
      const div = document.createElement('div');
      div.style.width = config.width;
      div.style.height = config.height;
      div.className = 'nJ-bottom-sheet rounded-edges-top shadowXl flex flex-col fixed bottom-0 bg-white z-50 justify-center slideUp';

      // Add content based on type
      if (config.type === 'message') {
        const h5 = document.createElement('h5');
        h5.textContent = config.message;
        div.appendChild(h5);
        h5.classList.add('text-center');
      } else if (config.type === 'list') {
        config.list.forEach((element,index) => {
          const anchor = document.createElement('a');
          anchor.innerHTML = element;
          anchor.href = config.link[index] || "#";
          anchor.target = "_blank";
          anchor.className = 'block p-2 text-black hover-text text-decoration-none';
          div.appendChild(anchor);
        });
      }

      // Add close button
      const closeButton = document.createElement('button');
      closeButton.textContent = "Close";
      closeButton.className = 'mt-auto bg-grey text-white p-1 rounded border-none w-50';
      closeButton.addEventListener('click', async() => {
        
        div.classList.toggle('back');
        
        overlay.remove();
      });
      div.appendChild(closeButton);

      // Append overlay and bottom sheet
      document.body.appendChild(overlay);
      document.body.appendChild(div);
    },
  };
})();

