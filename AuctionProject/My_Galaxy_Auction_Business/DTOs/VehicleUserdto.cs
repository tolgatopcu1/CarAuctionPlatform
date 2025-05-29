public class VehicleUserdto
{
    public int VehicleId { get; set; }
    public string BrandAndModel { get; set; } = "";
    public string Color { get; set; } = "";
    public int ManufacturingYear { get; set; }
    public decimal Price { get; set; }
    public string? Image { get; set; }
    public bool IsActive { get; set; }
}