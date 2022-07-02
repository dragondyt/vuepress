<script lang="ts" setup></script>

<template>
  <div class="md">
    <Content />
  </div>
</template>

<style lang="postcss">
.md {
  font-family: Mulish, -apple-system, 'PingFang SC', 'Microsoft YaHei',
    sans-serif;
  overflow-wrap: break-word;
  word-wrap: break-word;

  a {
    color: var(--primary-color);
  }

  h1 {
    position: relative;
    padding-top: 0.625rem;
    font-size: 1.5em;

    &::after {
      content: '';
      display: block;
      box-sizing: unset;
      width: 100%;
      height: 0.0625rem;
      background: var(--grey-3);
      padding-right: 1.25rem;
      margin-left: -1.25rem;
      margin-top: 0.3125rem;
    }
  }

  h2 {
    position: relative;
    padding-top: 0.625rem;
    font-size: 1.375em;
  }

  ins {
    --line-color: var(--note-hover, var(--primary-color));
    text-decoration: none;
    border-bottom: 0.125rem solid var(--line-color);

    &.wavy {
      text-decoration-style: wavy;
      text-decoration-line: underline;
      text-decoration-color: var(--line-color);
      border-bottom: none;
    }

    &.dot {
      border-bottom: 0.2rem dotted var(--line-color);
    }
  }

  li {
    position: relative;
    margin: 0.2rem 0;
  }

  p {
    margin: 0 0 0.8rem;
  }

  pre {
    margin-bottom: 0;
    &.shiki {
      background-color: unset !important;
    }
  }

  span {
    &.label {
      display: inline;
      border-radius: 0.3rem;
      border: 0.0625rem solid;
      padding: 0.2rem 0.3rem;
      font-family: Inconsolata, consolas, Menlo, -apple-system, 'PingFang SC',
        'Microsoft YaHei';
      font-size: 1em;
      background: var(--note-bg, var(--grey-2));
      border-color: var(--note-border, var(--grey-4));
      color: var(--note-text, var(--grey-6));
    }
  }

  table {
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 0.5em 0 0.5em;
    padding: 0.1em 0.2em 0.1em 1.4em;

    li {
      &::before {
        transition: all 0.2s ease-in-out 0s;
      }

      &.task-list-item {
        &::before {
          width: auto;
          height: auto;
          background: 0 0 !important;
          border: none !important;
          position: relative;
          top: 0 !important;
          left: 0 !important;
        }
      }
    }

    & > li {
      &::before {
        content: '';
        position: absolute;
        width: 0.4em;
        height: 0.4em;
        background: var(--primary-color);
        border-radius: 50%;
        top: 0.85em;
        left: -1em;
      }
    }
  }

  .bulr {
    text-shadow: rgb(0 0 0 / 70%) 0 0 0.625rem;
    color: transparent;
  }

  .kbd,
  kbd {
    background-color: var(--grey-1);
    background-image: linear-gradient(
      var(--grey-2),
      var(--grey-0),
      var(--grey-2)
    );
    border: 0.0625rem solid var(--grey-4);
    border-radius: 0.2rem;
    box-shadow: 0.1rem 0.1rem 0.2rem var(--grey-9-a1);
    font-family: inherit;
    padding: 0.1rem 0.3rem;
    white-space: nowrap;
  }

  .note {
    border-radius: 0.1875rem;
    margin: 1rem 0;
    position: relative;
    background: var(--note-bg, var(--grey-2));
    color: var(--grey-6);
    border-left: 0.25rem solid var(--note-border, var(--grey-4));
    font-size: 0.875em;
    padding: 1rem 1rem 1rem 2.5rem;

    &::before {
      position: absolute;
      left: 0.5rem;
      top: calc(50% - 1.5rem);
      font-family: ic;
      font-weight: 400;
      font-size: 1.5rem;
      color: var(--note-text, var(--grey-6));
    }

    --primary-color: var(--note-text);
  }

  .highlight {
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
    box-shadow: 0 0.3125rem 0.625rem -0.125rem var(--grey-9-a1);
    background: var(--grey-2);
    color: var(--grey-7);
    line-height: 1.6;
    margin: 1.25rem auto;

    &::before {
      content: ' ';
      position: absolute;
      border-radius: 50%;
      background: #fc625d;
      width: 0.75rem;
      height: 0.75rem;
      left: 0.75rem;
      top: 0.8125rem;
      box-shadow: 1.25rem 0 #fdbc40, 2.5rem 0 #35cd4b;
    }

    figcaption {
      color: var(--grey-4);
      display: inline-flex;
      font-size: 0.875em;
      font-weight: 700;
      padding: 0 6rem 0 5rem;
      min-height: 2.5rem;
      width: 100%;
      text-align: center;
      align-items: center;
      justify-content: space-between;
      background-color: var(--grey-3);
      margin-bottom: 0.625rem;

      &::before {
        content: attr(data-lang);
        text-transform: Capitalize;
      }

      a {
        color: var(--grey-5);
        display: block;
        margin-left: 0.625rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          color: var(--grey-6);
        }
      }

      span {
        display: block;
        margin-left: 0.625rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .code-container {
    overflow-x: scroll;
    overflow-y: hidden;

    &::after {
      content: '';
      display: block;
      height: 0.625rem;
      width: 100%;
    }

    .comment {
      color: var(--grey-5);
    }

    .punctuation {
      color: var(--grey-5);
    }

    table {
      line-break: anywhere;
      white-space: break-spaces;
      border-spacing: 0;
      width: 100%;

      tr {
        background-color: inherit;
      }

      td {
        position: relative;
        padding: unset;
        vertical-align: unset;
        border: unset;
        transition: all 0.2s ease-in-out 0s;

        &:first-child {
          position: absolute;
          background: var(--grey-2);
          text-align: right;
          overflow-x: visible !important;
          overflow-y: hidden;
          left: 0;
          width: 2.5rem;
          padding-right: 0.9375rem;
          color: var(--color-grey);
          z-index: 1;
        }

        &:nth-child(2) {
          padding-left: 3rem;
        }

        &:last-child {
          padding-right: 0.9375rem;
        }

        &[data-num]::before {
          content: attr(data-num);
        }
      }

      pre {
        white-space: break-spaces;

        &::before {
          content: ' ';
        }
      }
    }
  }

  .operation {
    color: var(--grey-5);
    cursor: pointer;
    position: absolute;
    padding: 0.125rem 0.375rem;
    right: 0.125rem;
    top: 0.45rem;
    font-size: 0.8125em;

    span {
      transition: all 0.2s ease-in-out 0s;
      margin: 0 0.3125rem;
    }
  }

  .rainbow {
    background-image: linear-gradient(
      to left,
      #ff4500,
      orange,
      gold,
      #90ee90,
      #0ff,
      #1e90ff,
      #9370db,
      #ff69b4,
      #ff4500
    );
    background-size: 110vw;
    background-clip: text;
    color: transparent;
    animation: rainbow 60s linear infinite;
  }
  .spoiler:not(.bulr) {
    background-color: var(--text-color);
    color: var(--text-color);
    text-shadow: none;
    transition: color 0.3s;
    padding: 0 0.1875rem;
  }
  .tabs {
    margin: 0 0 2rem;
    border-radius: 0.5rem;
    border: 0.0625rem solid var(--grey-2);
    box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--box-bg-shadow);
  }
  .table-container {
    overflow: auto;

    table {
      border-collapse: collapse;
      border-spacing: 0;
      font-size: 0.875em;
      margin: 0 0 1.25rem 0;
      width: 100%;
      overflow: auto;

      td {
        border: 0.0625rem solid var(--grey-3);
        border-bottom: 0.1875rem solid var(--grey-3);
        border-bottom-width: 0.0625rem;
      }

      th {
        border: 0.0625rem solid var(--grey-3);
        border-bottom: 0.1875rem solid var(--grey-3);
      }
    }
  }
}
</style>
