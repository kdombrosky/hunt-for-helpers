async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="event-title"]').value;
    const description = document.querySelector('input[name="event-description"]').value;
    const date = document.querySelector('input[name="event-date"]').value;
    const location = document.querySelector('input[name="event-location"]').value;
  
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        location,
        date

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }

  
  
  document.querySelector('.create-new-event').addEventListener('submit', newFormHandler);