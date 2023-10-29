export const DefaultInput = <input type="text" placeholder="Type here" class="input w-full max-w-xs" />

export const BorderedInput = <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />

export const GhostInput = <input type="text" placeholder="Type here" class="input input-ghost w-full max-w-xs" />

export const FormInput = (
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">What is your name?</span>
      <span class="label-text-alt">Top Right label</span>
    </label>
    <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
    <label class="label">
      <span class="label-text-alt">Bottom Left label</span>
      <span class="label-text-alt">Bottom Right label</span>
    </label>
  </div>
)

export const TypesInput = (
  <div>
    <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" />

    <input type="text" placeholder="Type here" class="input input-bordered input-success w-full max-w-xs" />
  </div>
)

export const SizesInput = (
  <div>
    <input type="text" placeholder="Type here" class="input input-bordered input-xs w-full max-w-xs" />

    <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-xs" />

    <input type="text" placeholder="Type here" class="input input-bordered input-md w-full max-w-xs" />

    <input type="text" placeholder="Type here" class="input input-bordered input-lg w-full max-w-xs" />
  </div>
)
