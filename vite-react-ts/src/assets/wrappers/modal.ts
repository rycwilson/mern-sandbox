import styled from 'styled-components';

export default styled.div`
  dialog {
    margin: 3rem auto 0;
    box-shadow: var(--shadow-4);
    border: none;
    border-radius: var(--border-radius);
    width: 400px;
  
    .modal-header,
    .modal-body {
      padding: 1rem;
    }
  
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--grey-200);
  
      button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5em;
  
        svg {
          display: flex;
        }
      }
    }
  }
`;