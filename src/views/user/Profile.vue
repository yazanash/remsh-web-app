<script setup>

</script>

<template>
    <div class="container d-flex justify-content-center align-items-center flex-column my-3 ">
    <h2 class="mb-4  row">Profile</h2>
    <div class="col-md-6 col-sm-12">

    <form class="row g-3">
      <div class="col-md-12">
        <label for="inputEmail4" class="form-label">Name</label>
        <input type="text" class="form-control" id="inputEmail4">
      </div>
      <div class="col-md-12">
        <label for="inputPassword4" class="form-label">Phone</label>
        <input type="password" class="form-control" id="inputPassword4">
      </div>
          <div class="col-12">
            <label for="inputEmail4" class="form-label">Gender</label>

            <div class="form-check">
              <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">
            Default radio
          </label>
        </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
            <label class="form-check-label" for="flexRadioDefault2">
              Default checked radio
            </label>
          </div>
              </div>
            </div>
            <div class="col-md-12">
              <label for="inputPassword4" class="form-label">Date of Birth</label>
              <input type="date" class="form-control" id="inputPassword4">
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary float-end">Sign in</button>
            </div>
          </form>
    </div>

  </div>
</template>