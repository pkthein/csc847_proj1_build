import { cloudStore } from '../firebase/init'
// import firebase from 'firebase'

export default {
  name: 'PageIndex',
  components: {
  },
  created () {
    this.db = cloudStore

    this.getStudents()
  },
  data () {
    return {
      db: null,
      uuid: '',
      data: [],
      newStudent: {},
      dialog: {
        active: false,
        option: null
      },
      filter: '',
      finalFilter: '',
      loading: false,
      pagination: {
        rowsPerPage: 10,
        sortBy: 'name',
        descending: false
      },
      columns: [
        {
          name: 'name',
          required: true,
          align: 'center',
          label: 'Student Name',
          field: row => row.lastName + row.firstName,
          sortable: true
        },
        {
          name: 'uuid',
          required: true,
          label: 'SID',
          align: 'center',
          field: row => row.id,
          sortable: true
        },
        {
          name: 'email',
          required: true,
          align: 'center',
          label: 'Email',
          sortable: true
        },
        {
          name: 'gpa',
          required: true,
          label: 'GPA',
          align: 'center',
          sortable: true
        },
        {
          name: 'address',
          required: true,
          label: 'Mailing Address',
          align: 'center',
          sortable: true
        },
        {
          name: 'icons',
          align: 'center',
          label: ''
        }
      ]
    }
  },
  methods: {
    addNewStudent: function () {
      if (
        this.newStudent.firstName && this.newStudent.lastName &&
        this.newStudent.id && this.newStudent.email &&
        this.newStudent.gpa && this.newStudent.address
      ) {
        if (!this.newStudent.gpa.includes('.')) {
          this.newStudent.gpa = this.newStudent.gpa + '.0'
        }
        return this.db.collection('students').doc().set(this.newStudent)
          .then(() => {
            this.data.push(this.newStudent)
            this.dialog.active = false

            this.data.sort((a, b) => {
              if (a.lastName < b.lastName) { return -1 }
              if (a.lastName > b.lastName) { return 1 }
              return 0
            })

            this.$q.notify({
              type: 'positive',
              message: 'Added sucessfully!',
              timeout: 500
            })
          })
      }
    },
    addUpdate: function () {
      if (
        this.newStudent.firstName && this.newStudent.lastName &&
        this.newStudent.id && this.newStudent.email &&
        this.newStudent.gpa && this.newStudent.address
      ) {
        if (!this.newStudent.gpa.includes('.')) {
          this.newStudent.gpa = this.newStudent.gpa + '.0'
        }

        const docId = this.newStudent.uid

        delete this.newStudent.uid

        return this.db.collection('students').doc(docId)
          .update(this.newStudent)
          .then(() => {
            this.dialog.active = false

            this.$q.notify({
              type: 'positive',
              message: 'Added sucessfully!',
              timeout: 500
            })
          })
      }
    },
    searchFilter: function () {
      this.finalFilter = this.filter
      this.$router.push({
        path: '/',
        query: {
          filter: this.filter
        }
      })
    },
    getStudents: function () {
      return this.db.collection('students').get()
        .then(docs => {
          docs.forEach(doc => {
            const data = doc.data()
            data.uid = doc.id

            this.data.push(data)
          })
        })
        .catch(error => {
          if (error) {
            /* console.log(error) */
          }
        })
    },
    deleteStudent: function (entry, id) {
      this.$q.dialog({
        title: 'Confirmation to Delete',
        message: `Delete ${id}?`,
        ok: true,
        cancel: true
      })
        .onOk(() => {
          return this.db.collection('students').doc(entry).delete()
            .then(() => {
              this.data = this.data.filter(v => v.uid !== entry)
              this.$q.notify({
                type: 'positive',
                message: 'Deleted sucessfully!',
                timeout: 500
              })
            })
            .catch(error => {
              if (error) {
                /* console.log(error) */
              }
            })
        })
        .onCancel(() => {
        })
    },
    editStudent: function (uid) {
      this.newStudent = this.data.filter(v => v.uid === uid)[0]

      this.dialog.active = true
      this.dialog.option = 'edit'
    }
  }
}
