<form key={index} id={vacation._id}>
  <Grid direction="row">
    <p>{index + 1}</p>
    <TextField
      id={vacation._id}
      label="Начало отпуска"
      type="date"
      defaultValue={moment(vacation.startDate).format("YYYY-MM-DD")}
      onChange={this.handleChange}
      name="startDate"
      InputLabelProps={{
        shrink: true,
      }}
    />
    <TextField
      id={vacation._id}
      label="Окончание отпуска"
      type="date"
      defaultValue={moment(vacation.finishDate).format("YYYY-MM-DD")}
      onChange={this.handleChange}
      name="finishDate"
      InputLabelProps={{
        shrink: true,
      }}
    />
    {!vacation.blocked ? (
      <ButtonGroup>
        <Button
          onClick={() => {
            this.updateVacation(vacation);
          }}
        >
          Изменить
        </Button>
        <Button
          onClick={() => {
            this.deleteVacation(vacation);
          }}
        >
          Удалить
        </Button>
      </ButtonGroup>
    ) : (
      <p>Даты нельзя поменять</p>
    )}
  </Grid>
</form>;


for (let index = 0; index < vacations.length; index++) {
  const user = await users.find((item) => item._id === vacations[index].userId);
  console.log(await user);
  Object.assign(vacations[index], user.firstName, user.lastName);
  console.log(vacations[index]);

  newVac.push(vacations[index]);
}