using Xunit;
using RestAPI.Models;

public class moviedata
{
    [Fact]
    public void Validate_ObtainingAllMovies()
    {
        // Arrange
        var repo = new RestAPI.Data.MockRestAPIRepo();

        // Act
        var response = repo.GetAllCommands();

        // Assert
        Assert.IsType<Movie[]>(response);
        Assert.NotEmpty(response);
        Assert.Equal(response.Length, repo._maxlimit);
    }

    [Theory]
    [InlineData("title", "Rush")]
    [InlineData("year", 2013)]
    [InlineData("info.actors", "Hemsworth")]
    [InlineData("info.rank", "1050")]
    [InlineData("info.directors", "Bryan Singer")]
    // [InlineData(6)]
    public void Validate_ObtainingMoviesBySearchTerm(string property, object value)
    {
        // Arrange
        var repo = new RestAPI.Data.MockRestAPIRepo();

        // Act
        var response = repo.GetCommandsByProperty(property, value);

        // Assert
        Assert.IsType<Movie[]>(response);
        Assert.NotEmpty(response);

        if (property.Contains("info."))
        {
            // To-Do: refactor method of searching sub component value, then add check on sub-component using new method
            return;
        }

        // Check search reponse matches criteria
        Movie firstinresponse = response[0];
        var prop = firstinresponse.GetType().GetProperty(property);
        string resvalue = prop.GetValue(firstinresponse).ToString();
        Assert.Contains(resvalue, value.ToString());
    }
}