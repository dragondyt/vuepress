<template>
  <main style="background: linear-gradient(to top,var(--body-bg-shadow) 0,var(--grey-1) 20%) no-repeat bottom;">
    <div class="inner flex content-start justify-between my-0 mx-auto" style="width: calc(100% - 0.625rem);">
      <div id="main" class="pjax w-full" style="    background: linear-gradient(to top,var(--grey-0) 0,var(--grey-1) 20%) no-repeat top;
    box-shadow: 0 1.25rem 1rem 0.3125rem var(--body-bg-shadow);
    min-height: 37.5rem;">
        <div class="index wrap relative p-2" style="    animation: slideUpBigIn .5s;">
          <h2 class="divider my-4 mx-0 font-bold uppercase select-none table whitespace-nowrap h-auto text-center leading-none"
              style="letter-spacing: .05rem;    color: var(--grey-4);">置顶文章</h2>
          <div class="segments sticky flex flex-col justify-center content-center">
          </div>

          <h2 class="divider my-4 mx-0 font-bold uppercase select-none table whitespace-nowrap h-auto text-center leading-none"
              style="letter-spacing: .05rem;    color: var(--grey-4);"></h2>
          <div class="cards flex my-0 mx-auto content-center flex-wrap justify-between">

          </div>

          <h2 class="divider my-4 mx-0 font-bold uppercase select-none table whitespace-nowrap h-auto text-center leading-none"
              style="letter-spacing: .05rem;    color: var(--grey-4);"></h2>
          <div class="segments sticky flex flex-col justify-center content-center posts">

          </div>

        </div>

        <nav class="pagination px-5 py-2.5 w-full text-center inline-block" style="    color: var(--grey-5);">
          <div class="mx-auto my-0 w-full">

          </div>
        </nav>
      </div>
      <div id="sidebar" class="fixed right-0 top-0 bottom-0 hidden" style="background: var(--grey-1);
    box-shadow: 0 0.375rem 0.9375rem 0.3125rem rgb(0 0 0 / 20%);
    z-index: 99;width: 15rem;    transition: all .2s ease-in-out 0s;">
        <!--        {% block sidebar %}{{ sidebar.render() }}{% endblock %}-->
      </div>
      <div class="dimmer bg-black h-full left-full opacity-0 top-0 w-full hidden"
           style="z-index: 9;transition: opacity 1s;"></div>
    </div>
  </main>
</template>
<style lang="postcss">
#main .wrap:nth-child(1) {
  margin-bottom: 1.25rem;
}

.divider::before {
  background-position: right 1rem top 50%;
}

.divider::after, .divider::before {
  content: '';
  display: table-cell;
  position: relative;
  top: 50%;
  width: 50%;
  background-repeat: no-repeat;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABaAAAAACCAYAAACuTHuKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OThBRDY4OUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OThBRDY4QUNDMTYxMUU0OUE3NUVGOEJDMzMzMjE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5OEFENjg3Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5OEFENjg4Q0MxNjExRTQ5QTc1RUY4QkMzMzMyMTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VU513gAAADVJREFUeNrs0DENACAQBDBIWLGBJQby/mUcJn5sJXQmOQMAAAAAAJqt+2prAAAAAACg2xdgANk6BEVuJgyMAAAAAElFTkSuQmCC);
}
</style>