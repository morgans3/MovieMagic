using Xunit;

public class moviedata
{
    [Fact]
    public void PassingTest()
    {
        // Arrange
        // Act
        // Assert
        Assert.Equal(4, 4);
    }

    [Fact]
    public void FailingTest()
    {
        // Arrange
        // Act
        // Assert
        Assert.NotEqual(4, 3);
    }

    [Theory]
    [InlineData(3)]
    [InlineData(5)]
    // [InlineData(6)]
    public void IsOdd(int value)
    {
        // Arrange
        // Act
        // Assert
        Assert.True(value % 2 == 1);
    }
}