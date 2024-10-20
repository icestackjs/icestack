<script setup lang="ts"></script>

<template>
  <div>
    <select class="select w-full max-w-xs">
      <option disabled="" selected="" value="Pick your favorite Simpson">
        Pick your favorite Simpson
      </option>
      <option value="Homer">
        Homer
      </option>
      <option value="Marge">
        Marge
      </option>
      <option value="Bart">
        Bart
      </option>
      <option value="Lisa">
        Lisa
      </option>
      <option value="Maggie">
        Maggie
      </option>
    </select>

    <select class="select w-full max-w-xs select-bordered">
      <option disabled="" selected="" value="Who shot first?">
        Who shot first?
      </option>
      <option value="Han Solo">
        Han Solo
      </option>
      <option value="Greedo">
        Greedo
      </option>
    </select>

    <select class="select w-full max-w-xs select-ghost">
      <option disabled="" selected="" value="Pick the best JS framework">
        Pick the best JS framework
      </option>
      <option value="Svelte">
        Svelte
      </option>
      <option value="Vue">
        Vue
      </option>
      <option value="React">
        React
      </option>
    </select>

    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">Pick the best fantasy franchise</span>
        <span class="label-text-alt">Alt label</span>
      </div>
      <select class="select select-bordered">
        <option disabled="" selected="" value="Pick one">Pick one</option>
        <option value="Star Wars">Star Wars</option>
        <option value="Harry Potter">Harry Potter</option>
        <option value="Lord of the Rings">Lord of the Rings</option>
        <option value="Planet of the Apes">Planet of the Apes</option>
        <option value="Star Trek">Star Trek</option>
      </select>
      <div class="label">
        <span class="label-text-alt">Alt label</span>
        <span class="label-text-alt">Alt label</span>
      </div>
    </label>

    <select class="select w-full max-w-xs select-primary">
      <option disabled="" selected="" value="What is the best TV show?">
        What is the best TV show?
      </option>
      <option value="Game of Thrones">
        Game of Thrones
      </option>
      <option value="Lost">
        Lost
      </option>
      <option value="Breaking Bad">
        Breaking Bad
      </option>
      <option value="Walking Dead">
        Walking Dead
      </option>
    </select>

    <select class="select w-full max-w-xs select-secondary">
      <option disabled="" selected="" value="Pick your favorite language">
        Pick your favorite language
      </option>
      <option value="Java">
        Java
      </option>
      <option value="Go">
        Go
      </option>
      <option value="C">
        C
      </option>
      <option value="C#">
        C#
      </option>
      <option value="C++">
        C++
      </option>
      <option value="Rust">
        Rust
      </option>
      <option value="JavaScript">
        JavaScript
      </option>
      <option value="Python">
        Python
      </option>
    </select>

    <select class="select w-full max-w-xs select-accent">
      <option disabled="" selected="" value="Dark mode or light mode?">
        Dark mode or light mode?
      </option>
      <option value="Auto">
        Auto
      </option>
      <option value="Dark mode">
        Dark mode
      </option>
      <option value="Light mode">
        Light mode
      </option>
    </select>

    <select class="select w-full max-w-xs select-info">
      <option disabled="" selected="" value="Select language">
        Select language
      </option>
      <option value="English">
        English
      </option>
      <option value="Japanese">
        Japanese
      </option>
      <option value="Italian">
        Italian
      </option>
    </select>

    <select class="select w-full max-w-xs select-success">
      <option disabled="" selected="" value="Pick your favorite anime">
        Pick your favorite anime
      </option>
      <option value="One Piece">
        One Piece
      </option>
      <option value="Naruto">
        Naruto
      </option>
      <option value="Death Note">
        Death Note
      </option>
      <option value="Attack on Titan">
        Attack on Titan
      </option>
      <option value="Bleach">
        Bleach
      </option>
      <option value="Fullmetal Alchemist">
        Fullmetal Alchemist
      </option>
      <option value="Jojo's Bizarre Adventure">
        Jojo's Bizarre Adventure
      </option>
    </select>

    <select class="select w-full max-w-xs select-warning">
      <option disabled="" selected="" value="Pick a pizza">
        Pick a pizza
      </option>
      <option value="Cheese">
        Cheese
      </option>
      <option value="Veggie">
        Veggie
      </option>
      <option value="Pepperoni">
        Pepperoni
      </option>
      <option value="Margherita">
        Margherita
      </option>
      <option value="Hawaiian">
        Hawaiian
      </option>
    </select>

    <select class="select w-full max-w-xs select-error">
      <option disabled="" selected="" value="What is the best headless CMS">
        What is the best headless CMS
      </option>
      <option value="Strapi">
        Strapi
      </option>
      <option value="Ghost">
        Ghost
      </option>
      <option value="Netlify CMS">
        Netlify CMS
      </option>
      <option value="Sanity">
        Sanity
      </option>
    </select>

    <div class="flex flex-col gap-4 w-full items-center">
      <select class="select select-bordered select-lg w-full max-w-xs">
        <option disabled="" selected="" value="Large">
          Large
        </option>
        <option value="Large Apple">
          Large Apple
        </option>
        <option value="Large Orange">
          Large Orange
        </option>
        <option value="Large Tomato">
          Large Tomato
        </option>
      </select>
      <select class="select select-bordered w-full max-w-xs">
        <option disabled="" selected="" value="Normal">
          Normal
        </option>
        <option value="Normal Apple">
          Normal Apple
        </option>
        <option value="Normal Orange">
          Normal Orange
        </option>
        <option value="Normal Tomato">
          Normal Tomato
        </option>
      </select>
      <select class="select select-bordered select-sm w-full max-w-xs">
        <option disabled="" selected="" value="Small">
          Small
        </option>
        <option value="Small Apple">
          Small Apple
        </option>
        <option value="Small Orange">
          Small Orange
        </option>
        <option value="Small Tomato">
          Small Tomato
        </option>
      </select>
      <select class="select select-bordered select-xs w-full max-w-xs">
        <option disabled="" selected="" value="Tiny">
          Tiny
        </option>
        <option value="Tiny Apple">
          Tiny Apple
        </option>
        <option value="Tiny Orange">
          Tiny Orange
        </option>
        <option value="Tiny Tomato">
          Tiny Tomato
        </option>
      </select>
    </div>

    <select class="select w-full max-w-xs" disabled="">
      <option value="You can't touch this">
        You can't touch this
      </option>
    </select>
  </div>
</template>
