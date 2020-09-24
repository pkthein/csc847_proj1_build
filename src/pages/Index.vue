<template>
  <q-page class="" align="">
    <div class="q-mt-xl" align="center">
      <q-table
        color="secondary" row-key="name"
        :data="data" :columns="columns" :filter="finalFilter"
        :loading="loading" :pagination.sync="pagination"
        separator="cell"
        style="width: 90vw; max-width: 1000px;"
      >
        <template v-slot:top-left>
          <q-btn
            round
            icon="add" color="secondary"
            @click="dialog.active = true; dialog.option = 'add'; newStudent = {}"
          />
        </template>

        <template v-slot:top-right>
          <q-toolbar>
            <q-input
              dense
              debounce="300" color="primary" placeholder="Search"
              v-model="filter"
              @keyup.enter="searchFilter"
              @keyup.esc="filter = ''"
            >
              <template v-slot:append>
                <q-icon
                  v-if="filter === ''"
                  name="search"
                />
                <q-icon
                  v-else
                  name="clear"
                  class="cursor-pointer"
                  @click="filter = ''"
                />
              </template>
            </q-input>
          </q-toolbar>
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="font-size: 18px; font-weight: normal;"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              key="name"
              :props="props"
            >
              <div class="q-ml-sm" align="left">
                {{ props.row.lastName }}, {{ props.row.firstName }}
              </div>
            </q-td>

            <q-td
              key="uuid"
              :props="props"
            >
              <div align="center">
                {{ props.row.id }}
              </div>
            </q-td>

            <q-td
              key="email"
              :props="props"
            >
              <div align="center">
                {{ props.row.email }}
              </div>
            </q-td>

            <q-td
              key="gpa"
              :props="props"
            >
              <div align="center">
                {{ props.row.gpa }}
              </div>
            </q-td>

            <q-td
              key="address"
              :props="props"
            >
              <div align="left">
                {{ props.row.address }}
              </div>
            </q-td>

            <q-td
              key="icons"
              :props="props"
              style="width: 100px;"
            >
              <q-btn
                dense round flat
                color="secondary" icon="edit"
                @click="editStudent(props.row.uid)"
              />

              <q-btn
                dense round flat
                color="secondary" icon="delete"
                @click="deleteStudent(props.row.uid, props.row.id)"
              />
            </q-td>

          </q-tr>
        </template>

      </q-table>
    </div>

    <q-dialog
      persistent maximized
      transition-show="slide-up" transition-hide="slide-down"
      v-model="dialog.active"
    >
      <q-card>
        <q-card-section
          v-if="dialog.option === 'add'"
        >
          <q-page>
            <div class="text-bold" style="font-size: 2em;">
              Add Student
              <hr style="margin-top: -4px;">
            </div>

            <div class="q-gutter-sm">
              <q-input
                v-model="newStudent.firstName"
                dense rounded outlined
                placeholder="First Name"
              ></q-input>
              <q-input
                v-model="newStudent.lastName"
                dense rounded outlined
                placeholder="Last Name"
              ></q-input>
              <q-input
                v-model="newStudent.id"
                dense rounded outlined
                placeholder="SID"
              ></q-input>
              <q-input
                v-model="newStudent.email"
                type="email"
                dense rounded outlined
                placeholder="Email"
              ></q-input>
              <q-input
                v-model="newStudent.gpa"
                type="number"
                dense rounded outlined
                placeholder="GPA"
              ></q-input>
              <q-input
                v-model="newStudent.address"
                dense rounded outlined
                placeholder="Mailing Address"
              ></q-input>
            </div>

            <div class="q-mt-sm" align="right">
              <q-btn rounded outline style="width: 300px;" @click="addNewStudent()">Submit</q-btn>
            </div>
          </q-page>
        </q-card-section>

        <q-card-section
          v-if="dialog.option === 'edit'"
        >
          <q-page>
            <div class="text-bold" style="font-size: 2em;">
              Edit Student
              <hr style="margin-top: -4px;">
            </div>

            <div class="q-gutter-sm">
              <q-input
                v-model="newStudent.firstName"
                dense rounded outlined
                placeholder="First Name"
              ></q-input>
              <q-input
                v-model="newStudent.lastName"
                dense rounded outlined
                placeholder="Last Name"
              ></q-input>
              <q-input
                v-model="newStudent.id"
                dense rounded outlined
                placeholder="SID"
              ></q-input>
              <q-input
                v-model="newStudent.email"
                type="email"
                dense rounded outlined
                placeholder="Email"
              ></q-input>
              <q-input
                v-model="newStudent.gpa"
                type="number"
                dense rounded outlined
                placeholder="GPA"
              ></q-input>
              <q-input
                v-model="newStudent.address"
                dense rounded outlined
                placeholder="Mailing Address"
              ></q-input>
            </div>

            <div class="q-mt-sm" align="right">
              <q-btn rounded outline style="width: 300px;" @click="addUpdate()">Update</q-btn>
            </div>
          </q-page>
        </q-card-section>

        <q-btn
          round dense
          color="secondary" icon="close" class="absolute i-dialog-close"
          @click="dialog.active = false"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script src="./indexScript.js">
</script>

<style>
</style>
